import React,  { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { articlesCreate, articlesEdit } from "../../features/articlesSlice";
import { PrimaryButton } from "./CommonStyled";

export default function EditArticle({prodId}) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { items, editStatus } = useSelector((state) => state.articles);
 
  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");
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

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProd = items.filter((item) => item._id === prodId);

    selectedProd = selectedProd[0];

    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setArticleImg("");
    setType(selectedProd.type);
    setName(selectedProd.name);
    setContent(selectedProd.content);
    setDesc(selectedProd.desc);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      articlesEdit({
        articleImg,
        article: {
          ...currentProd,
          name: name,
          type: type,
          desc: desc, 
          content: content, 
        },
      })
    );
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog open={open} onClose={handleClose} fullWidth = {true} maxWidth={"md"}>
        <DialogTitle>Edit Article </DialogTitle>
        <DialogContent>
          <StyledEditArticle>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Create a Article</h3>
              <input
                type="file"
                accept="image/"
                onChange={handleArticleImageUpload}
                required
              />
              <select 
              onChange={(e) => setType(e.target.value)} 
              value={type}
              required>
                <option value="">Select Type</option>
                <option value="iphone">Galla</option>
                <option value="samsung">Dinner</option>
                <option value="xiomi">Show</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              />
              <input
                type="text"
                required
                placeholder="Short Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Short Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <PrimaryButton type="submit">
                {editStatus === "pending" ? "Submitting" : "Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              { previewImg ? (
                <>
                  <img src={previewImg} alt="article image!" />
                </>
              ) : (
                <p>Image upload preview will appear here!</p>
              )}
            </ImagePreview>
          </StyledEditArticle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

const StyledEditArticle = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(78, 78, 78);
  img {
    max-width: 100;
  }
`;
