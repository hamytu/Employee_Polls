import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as utils from '../../utils/appUtils';
import { Link } from 'react-router-dom';

const QuestionCard = ({ content: question }) => {
    const backgroundColor = question.isDone ? '#D8D8D8' : '#F8F8F8';

    return (
        <Card sx={{ margin: 1, width: 230, height: 130, backgroundColor }}>
            <CardContent sx={{ paddingBottom: 0 }}>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {utils.getDatetimeFromUnix(question.timestamp)}
                </Typography>
                <Typography variant='h6' component='div'>
                    by {question.author}
                </Typography>
                <Typography sx={{ fontSize: 11 }} color='text.secondary'>
                    Poll ID: {question.id}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' component={Link} to={`/questions/${question.id}`}>
                    {question.isDone ? 'SHOW' : 'ANSWER NOW'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default QuestionCard;
