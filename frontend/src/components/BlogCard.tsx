import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    IconButton,
    Button,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
    onDelete: (id: string) => void;
    isAdmin: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
    id,
    title,
    content,
    image,
    createdAt,
    onDelete,
    isAdmin,
}) => {
    const placeholderImage =
        'https://via.placeholder.com/600x300?text=No+Image+Available';

    return (
        <Card sx={{ marginY: 4, padding: 2, boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
                        {title.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={title}
                subheader={new Date(createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            />
            <CardMedia
                component="img"
                height="300"
                image={image || placeholderImage}
                alt={title}
                sx={{ borderRadius: 2 }}
            />
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like post">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment on post">
                    <CommentIcon />
                </IconButton>
                {isAdmin && (
                    <Button
                        size="small"
                        sx={{ marginLeft: 'auto' }}
                        onClick={() => onDelete(id)}
                    >
                        <DeleteIcon /> Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default BlogCard;
