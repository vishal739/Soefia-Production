import Navbar from "../Navbar/Navbar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CurrentSummation from "./CurrentSummation";
import "./Student.scss"

const Student = () => {
    const data = [
        { date: '10/4', value: 30 },
        { date: '10/6', value: 50 },
        { date: '10/11', value: 20 },
        { date: '10/13', value: 40 },
        { date: '10/18', value: 35 },
        { date: '10/20', value: 60 },
    ];
    return (
        <div>
            <Navbar />
            <div className="chart-container">
                <div className="barchart">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart2">
                    <CurrentSummation/>
                </div>
            </div>
        </div>
    )
}

export default Student