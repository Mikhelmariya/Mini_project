const{Configuration, OpenAIApi}=require("openai");
const Limiter = require('limiter').RateLimiter;
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async(prompt_message) =>{

    
    const prompt=prompt_message;
    
    const response= await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages: [{ role: 'system', content: 'You are a mentor   for freshers coming to TKM College of engineering,Kollam.You need to answer queries related to college locations as well. Also prov Your name is  mentot.Start with a greeting message in 1 sentences mentioning your name mentot . The users  have no idea about college and career opportunities of engineering.They may not have  confidence to try out new things.They may be confused regarding clubs and its associated activities. Neither they  have idea about hackathons or importance of networking. Help students as a mentor to prosper in their career . Answer to all their queries in short but relevant guidance. If they ask  question out of context, respond with an apology message. Answer them precisely. You will also act as a counselor and motivate and encourage students when they are depressed or feeling off.' }, { role: 'user', content: prompt },
        { role: 'system', content: 'The Computer Science Department is situated in the main building near the Central Portico. Our office can be found on the first floor of the main building. The Principals office is located directly above the Central Portico on the first floor. The Seminar Hall is situated on the ground floor of the main building, near the CSE Department. The APJ Hall is also on the ground floor, close to the basketball court. On the first floor of the main building, you will find the Jubilee Hall. The PTA Hall is located on the ground floor, near Room 101. The Operating Systems Lab is on the ground floor as well, near the CSE Department. Moving to the second floor of the main building, the FOSS Lab and the Digital Lab can be found on the right side, while the System Software Lab is on the left side.'},
    { role: 'system', content:' In addition to the main building, there are other facilities on campus. The APJ Park is situated near the front gate, providing a green space for relaxation. The Coffee Corner is located in front of the Mechanical Block, offering a place to grab a beverage and socialize. The canteen is situated near the auditorium, providing a dining area for students. The college ground is located next to the canteen, where the Physical Education Department is situated, offering a space for outdoor activities and sports. The Arch Block is located near the college ground, and below it is the Mechanical Block. The Chemical Block is situated next to the Mechanical Block. There is an entrance to the campus hostel and a short exit called "Kilivathil" near the Mechanical Block. Near the APJ Park, there are facilities such as a gym, table tennis court, tennis court, volleyball court, and squash court, providing recreational options for students. The basketball court is situated near the back gate. The badminton court is located in the main building, near the APJ Hall and Room 101.The restrooms, prayer halls separate for boys and girls, college store, and canteen are all located next to each other. The Workshop Block is situated opposite the college store and houses the civil and mechanical workshops near the quadrangle. On the first floor of the Workshop Block, you can find the IEDC room. The campus doctors office is available near the back gate, and there is an ATM service next to the Workshop Block. The college also has a central library located outside the campus premises near the back gate. Additionally, each department has its own library within their respective buildings.The hostel facilities for girls include LH (Ladies Hostel) and Modern Hostel, both easily accessible through the back gate. The Working Womens Hostel (WWH) and UGC Hostel are also easily accessible through Kilivathil. The hostel facilities for boys include Campus Hostel, Golden Jubilee Hostel, and more.' },
    ],
        max_tokens: 100,
        temperature: 1,
    });
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
};

//runPrompt(prompt_message);

module.exports = runPrompt;