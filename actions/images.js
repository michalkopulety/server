import cloudinary from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'dtx9htwec', 
    api_key: '851773678863756', 
    api_secret: '9vjj03tlSVar5i_IixiSSR84N3w' 
  });

const getImage = (req, res) => {
	const imageName = req.params.imageName;
    const cloudinaryResult = cloudinary.image(`${imageName}.png`);
    const regex = /\'(.*?)\'/;
    
    return res.json({
        success: true,
        data: regex.exec(cloudinaryResult)[1]
    });
}

export {
    getImage
};