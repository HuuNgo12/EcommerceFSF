const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    // đây là 1 phương thức của mongleDB: tìm đối tượng user theo email: nếu
    // tồn tại thì update name và picture. CÒn nếu k tồn tại thì user là null
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);

    res.json(newUser);
  }
  // vòng If này là check nếu user đã tồn tại thì res, còn nếu chưa tồn tại thì tạo mới 1 user với email, name, picture
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    if (!user) {
      // Nếu không tìm thấy user, trả về lỗi 404 - Not Found
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
