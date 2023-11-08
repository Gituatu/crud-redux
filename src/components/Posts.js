import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Posts = () => {
  const [id, setId] = useState();
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));
  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please provide post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("Post Deleted!");
  };

  return (
    <>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Search by ID:
              </label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter post title"
              />
            </div>
            <button
              onClick={handleFetchData}
              type="submit"
              className="btn btn-primary"
            >
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/createpost")}
              type="submit"
              className="btn btn-warning ms-4"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          id="floatingTextarea"
                        />
                        <div className="mt-3 d-flex align-items-end justify-content-end">
                          <button
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                            className="btn btn-primary"
                          >
                            Save
                          </button>
                          <button
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                            className="btn btn-danger ms-4"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger ms-4"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
