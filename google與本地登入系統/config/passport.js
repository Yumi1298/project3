const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

// user所自動帶入的值為GoogleStrategy內執行done時的第二個參數
// 這邊的done，與下方的無關
passport.serializeUser((user, done) => {
  console.log("Serialize序列化使用者");
  // console.log(user);
  done(null, user._id); // _id為mongoDB內的id，將mongoDB的id,存在session
  // 並且將id簽名後，以cookie的形式給使用者
});

// 第一個參數自動拿到serializeUser的user._id。
passport.deserializeUser(async (_id, done) => {
  console.log(
    "Deserialize使用者。。。將serializeUser儲存的id，去找到資料庫內的資料"
  );
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); // 將req.user這個屬性設定為foundUser
});

passport.use(
  new GoogleStrategy(
    {
      // GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET 可自命名
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入google strategy 的區域");
      // console.log(profile);
      // console.log("====================");
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("使用者已經註冊過了，無須存入資料庫內");
        done(null, foundUser);
      } else {
        console.log("偵測到新用戶。需將資料存入資料庫");
        let newUser = new User({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        let savedUser = await newUser.save();
        console.log("成功創建新用戶");
        // done第一個參數是passport規定的，寫null即可
        done(null, savedUser);
      }
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let foundUser = await User.findOne({ email: username });
    if (foundUser) {
      let result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        done(null, foundUser);
      } else {
        done(null, false);
      }
    } else {
      done(null, false); // done的第二個參數false代表沒有被驗證成功
    }
  })
);
