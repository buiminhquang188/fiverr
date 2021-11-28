import React, { useState, useEffect } from "react";
import { Comment, Tooltip, List, Avatar, Form, Button, Input } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import clientApi from "apis/clientApi";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function JobDetailComment(props) {
  const { currentUser } = useSelector((state) => state.authReducer);
  let [comment, setComment] = useState({
    comments: [],
    submitting: false,
    value: "",
  });
  const [dataComment, setDataComment] = useState({
    dataComment: [],
  });

  useEffect(() => {
    clientApi
      .fetchComment(props.idJob)
      .then((result) => {
        setDataComment({
          dataComment: result.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [comment.submitting]);

  const handleSubmit = () => {
    if (!comment.value) {
      return;
    }

    setComment({
      ...comment,
      submitting: true,
    });

    const dataComment = {
      content: comment.value,
      job: props.idJob,
    };

    handleUpdoadComment(dataComment);
  };

  const handleUpdoadComment = (formData) => {
    if (currentUser) {
      const { token } = currentUser;
      clientApi
        .fetchAddComment(formData, token)
        .then((result) => {
          console.log(result.data);
          setComment({
            ...comment,
            submitting: false,
            value: "",
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleChange = (e) => {
    setComment({
      ...comment,
      value: e.target.value,
    });
  };

  const { comments, value, submitting } = comment;
  return (
    <div className="jobdetail__comment text-left">
      <List
        className="comment-list"
        header={`${dataComment.dataComment.length} replies`}
        itemLayout="horizontal"
        dataSource={dataComment.dataComment}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.user?.name ? item.user.name : "Anonymous"}
              avatar={item.user?.avatar ? item.user.avatar : null}
              content={item.content}
            />
          </li>
        )}
      />
      {currentUser ? (
        <>
          <Comment
            // avatar={<Avatar src={avatar} alt={nameComment} />}
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </>
      ) : (
        <div className="text-center w-full">
          <Link to="/login">Login to comment!!</Link>
        </div>
      )}
    </div>
  );
}
