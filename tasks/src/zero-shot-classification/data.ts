import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	
	demo: {
		inputs: [
			{
				label:   "Input",
				content: "I love teaching",
				type:    "text",
			},
			
		],
		outputs: [
			{
				type: "chart",
				data: [
                    {
                        label : "EDUCATION" ,
                        score : 0.990 ,
                    } ,
					{
						label: "POSITIVE",
						score: 0.908,
					},
					{
						label: "SCIENCE",
						score: 0.175,
					},
					{
						label: "POLITICS",
						score: 0.008,
					},
                    {
						label: "NEGATIVE",
						score: 0.008,
					},
				],
			},
		],
	},
	
	
	summary: "Zero-shot learning refers to a specific use case of deep learning where you want the model to classify data based on very few or even no labeled example", 
	
};

export default taskData;
