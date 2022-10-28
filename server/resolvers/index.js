const mongodb = require("mongodb");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * createUser
   * @param user
   * @return {Promise<*&{_id: any}>}
   */
  createUser: async (user) => {
    console.log(`\ncreatUser: -->`);
    try {
      const localUser = user;
      const hashPassword = await User.findOne({
        email: user.userInput.email,
      }).then((user) => {
        if (user) {
          throw new Error("User exists already.");
        }

        const pw = localUser.userInput.password;
        return bcrypt
          .hash(pw, 12)
          .then((hash) => {
            return hash;
          })
          .catch((err) => {
            console.log(`\nerror: `, err);
            throw err;
          });
      });

      const createdUser = await new User({
        userName: user.userInput.userName,
        height: user.userInput.height,
        email: user.userInput.email,
        password: hashPassword,
      });

      const newUser = await createdUser.save();

      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },
  /**
   * users
   * @return {Promise<T>}
   */
  users: async () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  /**
   * login
   * @param userName
   * @param password
   * @return {Promise<{tokenExpiration: number, userId: *, token: *}>}
   */
  login: async ({ userName, password }) => {
    try {
      const user = await User.findOne({ userName: userName });
      checkData(user);
      const isEqual = await bcrypt.compare(password, user.password);
      checkData(isEqual);

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "secretKey",
        { expiresIn: "1h" }
      );
      return { userId: user.id, token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  },

  /*
  addFile: async (_parent, { file }) => {
    const { stream, filename, mimetype, encoding } = await file;
    const bucket = new mongodb.GridFSBucket(db._db);
    const uploadStream = bucket.openUploadStream(filename);

    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream).on("error", reject).on("finish", resolve);
    });

    return { _id: uploadStream.id, filename, mimetype, encoding };
*/

  /*if (!request.isAuth) {
      throw new Error("Unauthorized");
    }
    try {
      const { file } = args;
      const newFile = new File({
        file,
        creator: request.userId,
      });
      const createdFile = await newFile.save();
      return { ...createdFile._doc, _id: createdFile.id };
    } catch (error) {
      throw error;
    }
  },*/
};

/**
 * validate
 * @param data
 */
function checkData(data) {
  if (!data) {
    console.log(`\nError found : `);
    throw Error("missing data");
  }
}
