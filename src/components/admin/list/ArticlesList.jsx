// list/ArticlesList.js
import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articlesDelete } from "../../../features/articlesSlice";
import EditArticle from "../EditArticle";
import { articlesFetch } from "../../../features/articlesSlice";
import moment from "moment";

export default function ArticlesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.articles);

  React.useEffect(() => {
    dispatch(articlesFetch());
  }, [dispatch]);

  const rows =
    list &&
    list.map((article) => {
      return {
        id: article._id,
        title: article.title,
        author: article.author,
        publishedAt: moment(article.publishedAt).fromNow(),
      };
    });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
    },
    {
      field: "publishedAt",
      headerName: "Published At",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <Edit onClick={() => navigate(`/article/${params.row.id}`)}>Edit</Edit>
            <View onClick={() => navigate(`/article/${params.row.id}`)}>View</View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    // dispatch(articlesDelete(id));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const Edit = styled.button`
  background-color: rgb(38, 198, 249);
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
