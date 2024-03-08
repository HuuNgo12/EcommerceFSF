const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body; // this from frontend
    const sub = await new Sub({
      name,
      parent,
      slug: slugify(name),
    }).save(); // use the name from frontend and use slugify() to create the slug.
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
  // Note: dòng trên là các phương thức trong MongoDB. Phương thức find({}) truyền vào object rỗng
  // là để truy vấn tất cả các bản ghi trong categories mà k có bất gì điều kiện gì hết, trong trường hợp này
  // đúng cho yêu cầu là list ra tất cả sản phẩm. sort({ createdAt: -1 }) dùng để lọc theo thứ tự mới nhất theo cột CreatedAt.
  //(nếu muốn xếp ngược lại thì thay bằng 1)
  // exec(): khi thằng này được gọi thì các phương thức trước đó mới được thực hiện
};
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};
exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body; // this from frontend
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    ); // tìm bằng slug, sau đó update name = name, slug thì tạo lại theo name mới
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update sub failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Delete sub failed");
  }
};
