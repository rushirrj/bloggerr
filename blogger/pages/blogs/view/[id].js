import React from "react";
import parse from "html-react-parser";
import axios from "axios";
const View = (props) => {
  const [comment, setComment] = React.useState("");
    // console.log(props.data.comments)
  const createComment = async () => {
    await axios
      .post(
        `http://localhost:5000/posts/comment/${props.data._id}`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        alert("Comment Posted")
        setComment('')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-3/4">
        <p className="text-center font-bold text-2xl my-3">View Blog Post</p>
        {props?.data?.image && (
          <img className="p-2 pb-1 text-center" src={props.data.image} />
        )}
        <p className="font-bold text-2xl text-center">Title: {props.data.title}</p>
        <hr />
        <>
          {props.data.description && (
            <p className=" text-center">
              Description: {props.data.description}
            </p>
          )}
        </>
        <hr />
        <div className="flex justify-center items-center"> {parse(props.data.body)}</div>

        <div className="w-full flex gap-2">
          <input
            className="mb-3 w-3/4 bg-white border-2 border-b-2 px-4 py-2 focus:border-gray-300"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Post Comment"
          />
          <button  onClick={createComment} className="bg-navBlue w-1/4 text-white rounded-sm h-10" >Comment</button>
        </div>
        <div className="border-2 p-5">
            <p className="font-bold text-lg">Comments</p>
            {props.data.comments.map((comment) => (
                <>
                <p className="bg-gray-200 p-2 rounded-lg font-bold mt-2">{comment?.content}</p>
                <hr/>
                </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default View;
export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/posts/post/${context.params.id}`
  );
  const data = await res.json();
  return {
    props: { data: data.post },
  };
}
