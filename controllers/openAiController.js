const OpenAIAPI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAIAPI({ key: process.env.OPENAI_API_KEY });

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.completions.create({
      model: 'text-davinci-003',  
      prompt: `Summarize this: \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (data && data.data[0].url) {
      return res.status(200).json(data.choices[0].text);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Summary generation failed.',
    });
  }
};


//para
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.completions.create({
      model: 'text-davinci-003',  
      prompt: `Generate paragraph : \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (data && data.data[0].url) {
      return res.status(200).json(data.choices[0].text);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Paragraph generation failed.',
    });
  }

};

  //chatbot
  exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.completions.create({
      model: 'text-davinci-003',  
      prompt: `Answer question similar to how jarvis from avengers would,
      Me: 'What is your name?'
      Jarvis : 'Jarvis Sir...At your service'
      Me : \n${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });

    if (data && data.data[0].url) {
      return res.status(200).json(data.choices[0].text);
    
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'No Response Sir Im Sorry',
    });
  }
};

//jsconverter
 exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.completions.create({
      model: 'text-davinci-002',  
      prompt: ` /*Convert these Intsruction into javascript Code: \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });

    if (data && data.data[0].url) {
      return res.status(200).json(data.choices[0].text);
    
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'No Response ',
    });
  }
};



// scifiimageConverter

exports.scifiimageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.completions.create({ 
      prompt: ` /*Convert these Intsruction into javascript Code: \n${text}`,
      n:1,
     size:'512x512',
    });

    if (data && data.data[0].url) {
      return res.status(200).json(data.choices[0].text);
    
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'No Response ',
    });
  }
};