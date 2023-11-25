import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { articlesCreate } from "../../features/articlesSlice";

const CreateArticle = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.articles);

  const [articleImg, setArticleImg] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const handleArticleImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setArticleImg(reader.result);
      };
    } else {
      setArticleImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      articlesCreate({
        name,
        type,
        desc,
        content,
        image: articleImg,
      })
    );
  };

  return (
    <StyledCreateArticle>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create a Article</h3>
        <input
          type="file"
          accept="image/"
          onChange={handleArticleImageUpload}
          required
        />
        <select onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiomi">Xiomi</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
           <input
          type="text"
          placeholder="Short Content"
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <PrimaryButton type="submit">
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {articleImg ? (
          <>
            <img src={articleImg} alt="error!" />
          </>
        ) : (
          <p>Article image upload preview will appear here!</p>
        )}
      </ImagePreview>
    </StyledCreateArticle>
  );
};

export default CreateArticle;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateArticle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;