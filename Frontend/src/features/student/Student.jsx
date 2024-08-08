import Navbar from "../Navbar/Navbar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CurrentSummation from "./CurrentSummation";
import "./Student.scss"
import LiveLesson from "../livelesson/LiveLesson";
// import LiveLesson from "../livelesson/LiveLesson";

const Student = () => {
    const progressData = [
        { category: 'Academic', percentage: 48 },
        { category: 'Social', percentage: 65 }
      ];
    const sentimentData = [
        { category: 'Positive', percentage: 50 },
        { category: 'Negative', percentage: 25 }
      ];
    return (
        <div>
            <Navbar />
            {/* <div className="chart-container">
                <div className="barchart">
                    <div className="progress-bar">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis domain={[0,100]}/>
                                <Tooltip />
                                <Bar dataKey="percentage" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="progress-bar">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={sentimentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis domain={[0,100]}/>
                                <Tooltip />
                                <Bar dataKey="percentage" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div> */}
            <LiveLesson/>
        </div>
    )
}

export default Student