export const initialState = {
  courses: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect - Associate",
      image: "https://udemy-images.udemy.com/course/480x270/362328_91f3_10.jpg",
      price: 600
    },
    {
      id: 2,
      name: "Learn 3D Modelling for Beginners",
      image: "https://udemy-images.udemy.com/course/240x135/438522_500f_6.jpg",
      price: 1500
    },
    {
      id: 3,
      name: "The Complete Ethical Hacking Course: Beginner to Advanced",
      image: "https://udemy-images.udemy.com/course/480x270/437490_c76a_4.jpg",
      price: 2700
    }
  ]
};

function courseReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return false;
  }
}

export default courseReducer
