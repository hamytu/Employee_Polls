import { useState } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Box } from '@mui/material';
import Questions from './Questions';
import { useLocation, Navigate } from 'react-router';

const Home = ({ loading }) => {
    const location = useLocation();
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (_, newIndex) => {
        setTabIndex(newIndex);
    };

    // Early return if loading
    if (loading) {
        return <Navigate to="/login" replace state={{ path: location.pathname }} />;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 5, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab id="new-questions" label="Unanswered" />
                    <Tab id="done" label="Answered" />
                </Tabs>
            </Box>
            <div role="tabpanel" id={`question-tab-${tabIndex}`}>
                <Questions isDone={tabIndex === 1} />
            </div>
        </Box>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    loading: !authedUser, // true if authedUser is null or empty string
});

export default connect(mapStateToProps)(Home);
