/* eslint-disable no-mixed-operators */
import * as React from "react"
import { styled } from "@mui/material/styles"
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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl
} from "@mui/material"
import { green } from "@mui/material/colors"
import {
    AddComment,
    Delete,
    Edit,
    ThumbUp,
    ThumbDownAlt,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material"
import PostComment from "./PostComment"
import modalStyles from "../../../utils/modalStyles"
import * as LocalStorageManager from "../../../utils/localStorageManager"
import CommentEdit from "./Modals/CommentEdit"
import * as PostRequest from "../../../api/postsRequest"
import * as CommentRequest from "../../../api/commentsRequest"

/**
 * Props for comments section
 */
const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}))

// Component itself

const getFirstLetterForAvatar = (name) => name[0]

const currentUser = LocalStorageManager.read()

function Post({
    id,
    title,
    author = "Guest",
    votes,
    text,
    timestamp,
    image,
    comments,
}) {
    // Restrict user from editing others posts
    const shouldDisableBtn = author !== currentUser
    // Comment section button (MUI framework technique)
    const [expanded, setExpanded] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    // Post
    const [openEdit, setOpenEdit] = React.useState(false)
    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)

    const [postTitle, setPostTitle] = React.useState('')
    let createMode = false

    // Comment modal
    const [openComment, setOpenComment] = React.useState(false)
    const handleOpenComment = () => setOpenComment(true)
    const handleCloseComment = () => setOpenComment(false)

    const [commentText, setCommentText] = React.useState('')

    let [postVotes, setPostVotes] = React.useState(0)
    const handleLike = () => setPostVotes(postVotes += 1)
    const handleDislike = () => setPostVotes(postVotes -= 1)
    
    React.useEffect(() => setPostVotes(votes), [votes])

    // File upload
    const [file, setFile] = React.useState(null)
    const inputRef = React.useRef(null)

    const handleUploadClick = () => {
        inputRef.current?.click()
     }
     const handleFileChange = (e) => {
        if (!e.target.files) return
        setFile(e.target.files[0])
        PostRequest.uploadImage({ picture: file, id })
      }



     const handlePostForm = async () => {
         if (createMode) {
            return PostRequest.addNew({
                title: postTitle,
                username: currentUser,
            })
         } else {
            return PostRequest.edit({
                title: postTitle,
                username: currentUser,
            })
         }
         
     }

     const handleCommentForm = async () => {
        await CommentRequest.create(commentText, id, currentUser)
        return handleCloseComment
     }

     const handleDeletePost = async () => {
        return PostRequest.remove(id)
     }

    
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
                votes: {postVotes}
                <IconButton aria-label="like" onClick={handleLike}>
                    <ThumbUp />
                </IconButton>
                <IconButton aria-label="dislike" onClick={handleDislike}>
                    <ThumbDownAlt />
                </IconButton>
                <IconButton aria-label="add_comment" onClick={handleOpenComment}>
                    {/* e.key === 27 is ESC */}
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
                                <TextField label="Standard" variant="standard" id="comment_title" placeholder="Comment title" 
                                onChange={(e) => setCommentText(e.target.value)} 
                                />
                                
                                <Button onClick={handleCommentForm}>Send!</Button>
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
                            <FormControl>
                              <RadioGroup row name="radio-buttons-post" id="post_option">
                                <FormControlLabel value="edit" control={<Radio />} label="Edit this post" onClick={() => createMode = false} />
                                <FormControlLabel value="add_new" control={<Radio />} label="Add new post" onClick={() => createMode = true} />
                              </RadioGroup>
                           </FormControl>
                            </Typography>
                            <Typography>
                                <TextField label="Standard" variant="standard" id="post_title" placeholder="Post title" onChange={(e) => setPostTitle(e.target.value)} />
                                <Button onClick={handleUploadClick} title="Post image">
                                    {file ? `${file.name}` : 'Click to select'}
                                </Button>

                                <input
                                  type="file"
                                  accept="image/*"
                                  ref={inputRef}
                                  onChange={handleFileChange}
                                  style={{ display: 'none' }}
                                />
                                <Button onClick={handlePostForm}>Send!</Button>
                            </Typography>
                        </Box>
                    </Modal>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete_post" onClick={handleDeletePost} disabled={shouldDisableBtn}>
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
            <PostComment comments={comments} text={''} date={timestamp} expanded={expanded} />
        </Card>
    )
}

export default Post
