import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { useLocation, Navigate } from 'react-router';

const headCells = [
    { id: 'avatar', label: 'Avatar', align: 'left' },
    { id: 'username', label: 'Author', align: 'left' },
    { id: 'noOfAsked', label: 'Number of asked questions', align: 'center' },
    { id: 'noOfAnswered', label: 'Number of answered questions', align: 'center' }
];

const Leaderboard = ({ loading, users }) => {
    const location = useLocation();

    // Early return if loading
    if (loading) {
        return <Navigate to="/login" replace state={{ path: location.pathname }} />;
    }

    const visibleRows = Object.values(users).map(({ id, name, avatarURL, answers, questions }) => ({
        id,
        author: name,
        avatar: avatarURL,
        noOfAnswered: Object.keys(answers).length,
        noOfAsked: questions.length
    })).sort((a, b) => (b.noOfAnswered + b.noOfAsked) - (a.noOfAnswered + a.noOfAsked));

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='small'>
                        <TableHead>
                            <TableRow>
                                {headCells.map(({ id, label, align }) => (
                                    <TableCell align={align} key={id}>
                                        {label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map(({ id, avatar, author, noOfAsked, noOfAnswered }) => (
                                <TableRow key={id}>
                                    <TableCell align='center'>
                                        <Avatar src={avatar} />
                                    </TableCell>
                                    <TableCell>{author}</TableCell>
                                    <TableCell align='center'>{noOfAsked}</TableCell>
                                    <TableCell align='center'>{noOfAnswered}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

const mapStateToProps = ({ authedUser, users }) => ({
    loading: !authedUser,
    users
});

export default connect(mapStateToProps)(Leaderboard);
