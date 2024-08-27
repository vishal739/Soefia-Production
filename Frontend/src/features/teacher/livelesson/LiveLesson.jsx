import Navbar from "../Navbar/Navbar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import "./LiveLesson.scss"

import { getGroupData } from "./data";
// import LiveLesson from "../livelesson/LiveLesson";

const LiveLesson = () => {
    // groups={}
    // const progressData = [
    //     { category: 'Academic', percentage: 48 },
    //     { category: 'Social', percentage: 65 }
    // ];
    // const sentimentData = [
    //     { category: 'Positive', percentage: 50 },
    //     { category: 'Negative', percentage: 25 }
    // ];
    const groups = getGroupData();
    console.log(groups)
    return (
        <div>
            <Navbar />
            <div className="live-lession-container">
                <h1 className="live-heading">Live Lession</h1>
                <div className="chart-container">
                    {groups && groups.map((group, index) => (
                        <div className="chart-box" key={index}>
                            <h2>Group {index + 1}</h2>
                            <h3>Working: {`Problem: ${index+1}`}</h3>
                            <div className="barchart">
                                <div className="progress-bar">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={group.progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="category" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Bar dataKey="percentage" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <h4>Progress</h4>
                                </div>
                                <div className="progress-bar">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={group.sentimentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="category" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Bar dataKey="percentage" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <h4>Sentiment</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LiveLesson