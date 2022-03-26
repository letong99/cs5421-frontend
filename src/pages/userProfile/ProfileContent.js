import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import './profile.css';

/* GET users/:user_id - Gets user by user ID {
    "status": "success",
    "data": {
        "id": 3,
        "email": "dexter@gmail.com",
        "full_name": "Dexter",
        "unsafe_password": "pass",
        "created_at": "2022-03-17T08:13:54.982086Z"
    }
} */

/*GET users/:user_id/attempts/attempt_id {
    "status": "success",
    "data": {
        "id": 23,
        "user_id": 3,
        "challenge_id": 1,
        "test_case_id": 2,
        "query": "<SELECT ...>",
        "execution_ms": 100,
        "score": 100,
        "created_at": "2022-03-17T08:02:28.411594Z",
        "status": "COMPLETED"
    }
}*/
const user = {
    "id": 3,
    "email": "dexter@gmail.com",
    "full_name": "Dexter",
    "unsafe_password": "pass",
    "created_at": "2022-03-17T08:13:54.982086Z"
}

const userAttempt = [
    {
        "id": 23,
        "user_id": 3,
        "challenge_id": 1,
        "test_case_id": 2,
        "query": "<SELECT ...>",
        "execution_ms": 100,
        "score": 100,
        "created_at": "2022-03-17T08:02:28.411594Z",
        "status": "COMPLETED"
    },
    {
        "id": 23,
        "user_id": 3,
        "challenge_id": 4,
        "test_case_id": 2,
        "query": "<SELECT ...>",
        "execution_ms": 13,
        "score": 45,
        "created_at": "2022-03-15T08:02:28.411594Z",
        "status": "COMPLETED"
    },
    {
        "id": 23,
        "user_id": 3,
        "challenge_id": 2,
        "test_case_id": 2,
        "query": "<SELECT ...>",
        "execution_ms": 34,
        "score": 57,
        "created_at": "2022-03-19T08:02:28.411594Z",
        "status": "COMPLETED"
    }
]



export default function ProfileContent() {

  let [challengeName, setChallengName] = useState("To Be fetched");
  let [records, setRecords] = useState();

  useEffect(() => {
    // fetch from APIs
  });

  return (
    <div>
        <h1>User Profile</h1>
        <img src={require("../../assets/panda.png")} width="80px" margin-bottom ="10px"/>
        <div className ='user-prop'>
            <Typography variant= "subtitle2" color = 'textSecondary'>USER NAME</Typography>
            <p>{user.full_name}</p>
        </div>
        <div className="user-prop">
            <Typography variant= "subtitle2" color = 'textSecondary'>E-MAIL</Typography>
            <p>{user.email}</p>
        </div>
        <div className="user-prop">
            <Paper>
                <Box m={2} pt={2}>
                    <Typography component = "h2" variant= "h6" color = 'primary' gutterBottom>Challenge Attempts</Typography>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Challenge ID</TableCell>
                            <TableCell>Query Execution Time (ms)</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userAttempt.map((attempt) => (
                            <TableRow key={attempt.id}>
                                <TableCell>{attempt.created_at}</TableCell>
                                <TableCell>{attempt.challenge_id}</TableCell>
                                <TableCell>{attempt.execution_ms}</TableCell>
                                <TableCell>{attempt.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    </div>
  );
}