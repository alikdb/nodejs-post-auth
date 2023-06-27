const { Post } = require("../models");
const slug = require("slug");

exports.createPost = async (req, res) => {
  console.log(req);
  const { title, content, description } = req.body;

  if ((!title || !content, !description)) {
    return res.send({
      status: false,
      message: "Lütfen tüm alanları doldurun.",
    });
  }
  try {
    const post = await Post.create({
      title,
      content,
      description,
      slug: slug(title),
      userId: req.user.id,
    });

    return res.send({
      status: true,
      post,
    });
  } catch (err) {
    return res.send({
      status: false,
      message: "Bir sorun oluştu",
    });
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;

  const post = await Post.findByPk(id);

  if (!id && !post) {
    return res.status(404).json({
      status: false,
      message: "Herhangi bir veri bulunamadı.",
    });
  }

  try {
    await post.destroy();
    return res.json({
      status: true,
      message: "Başarılı bir şekilde içerik silindi.",
    });
  } catch (err) {
    return res.status(404).json({
      status: false,
      message: "Herhangi bir veri bulunamadı.",
    });
  }
};
