import * as React from "react";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Modal,
    TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import {
    AddComment,
    Delete,
    Edit,
    ThumbUp,
    ThumbDownAlt,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import PostComment from "./PostComment";
import modalStyles from "../../../utils/modalStyles";
import * as LocalStorageManager from "../../../utils/localStorageManager";
import RadioEdit from "./Modals/RadioEdit";
import CommentEdit from "./Modals/CommentEdit";

/**
 * Props for comments section
 */
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

// Component itself

const getFirstLetterForAvatar = (name) => name[0];

const currentUser = LocalStorageManager.read()

const handlePostForm = () => {
    const postOption = document.getElementById('post_option');
    const postTitle = document.getElementById('post_title');
    const postValue = document.getElementById('post_value');
    console.log(postOption);
    console.log(postTitle);
    console.log(postValue);
}

function Post({
    title,
    author = "Guest",
    votes,
    text,
    timestamp,
    image,
    comments,
}) {
    const shouldDisableBtn = author !== currentUser;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openComment, setOpenComment] = React.useState(false);
    const handleOpenComment = () => setOpenComment(true);
    const handleCloseComment = () => setOpenComment(false);
    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: green[500] }}
                        aria-label="recipe"
                        title={author}
                    >
                        {getFirstLetterForAvatar(author)}
                    </Avatar>
                }
                title={title}
                subheader={timestamp}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={"Image for article: " + title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                votes: {votes}
                <IconButton aria-label="like">
                    <ThumbUp />
                </IconButton>
                <IconButton aria-label="dislike">
                    <ThumbDownAlt />
                </IconButton>
                <IconButton aria-label="add_comment" onClick={handleOpenComment}>
                <Modal
                        open={openComment}
                        onClose={handleCloseComment}
                        onKeyPress={(e) => e.key === 27 ? handleCloseComment : null}
                    >
                        <Box sx={modalStyles}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Comment Manager
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Press ESC to quit
                            </Typography>
                            <Typography>
                                <CommentEdit />
                            </Typography>
                            <Typography>
                                <TextField label="Standard" variant="standard" id="comment_title" placeholder="Post title" />
                                <input type="file" id="post_file" accept="image/*" title="Post image" />
                                <Button onClick={handlePostForm}>Send!</Button>
                            </Typography>
                        </Box>
                    </Modal>
                    <AddComment />
                </IconButton>
                <IconButton aria-label="edit_post" onClick={handleOpenEdit} disabled={shouldDisableBtn}>
                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                        onKeyPress={(e) => e.key === 27 ? handleCloseEdit : null}
                    >
                        <Box sx={modalStyles}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Post Manager
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Press ESC to quit
                            </Typography>
                            <Typography>
                                <RadioEdit />
                            </Typography>
                            <Typography>
                                <TextField label="Standard" variant="standard" id="post_title" placeholder="Post title" />
                                <input type="file" id="post_file" accept="image/*" title="Post image" />
                                <Button onClick={handlePostForm}>Send!</Button>
                            </Typography>
                        </Box>
                    </Modal>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete_post" disabled={shouldDisableBtn}>
                    <Delete />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    title="show comments"
                    aria-label="show comments"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <PostComment comments={comments} expanded={expanded} />
        </Card>
    );
}

export default Post;
