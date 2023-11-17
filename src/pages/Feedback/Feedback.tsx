import Navbar from "../Components/Navbar"
import { useEffect, useState, ChangeEvent } from "react";
import { Review } from "../../interfaces";

export default function Feedback() {
  const [listReview, setListReview] = useState<Review[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const options = [];
  for (let i = 1; i <= 5; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }

  const fetchData = async(username: string, token: any) => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${url}/review/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        // console.log("success")
        console.log(responseData.data);
        setListReview(responseData.data);
        console.log(listReview);
      } else {
        alert('Error fetching data, please try again later');
      }
    } catch (error) {
      console.error(error);
    }
  }  

  useEffect(() => {
    const user = localStorage.getItem('user');  
    if (user) {
      const username = JSON.parse(user).username;
      const token = localStorage.getItem('token');

      fetchData(username, token);
    }
  }, [])

  const ratingHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedRating(selectedValue);
  }

  const filteredReviews = listReview.filter(review => {
    // If no rating is selected, return true for all reviews
    if (!selectedRating) {
      return true;
    }
    // Otherwise, compare the review's rating with the selected rating
    return review.rating.toString() === selectedRating;
  });

  return (
    <>
      <Navbar/>
      <div className="bg-blue100 w-full min-h-[100vh] pt-[110px] flex justify-center px-5">
        <div className="w-full max-w-[900px] flex flex-col">
          <div className="flex">
            <select className="select mr-3" onChange={ratingHandler}>
              <option selected>Rate</option>
              {options} 
            </select>

          </div>

          <div className="container mb-20">
            {filteredReviews.map((review) => (
              <div className="card w-full bg-blue50 rounded-lg p-5 mt-5">
                <div className="flex justify-between">
                  <div>
                    <div></div>
                    <div className="text-medium font-medium">{review.reviewer}</div>
                  </div>
                  
                  <div>{review.rating}/5</div>
                </div>
                <p className="text-sm mb-5">{review.podcast.title}</p>
                <p className="font-semibold">{review.review}</p>
                <p className="mt-5 text-sm">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
};