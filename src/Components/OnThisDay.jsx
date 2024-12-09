import { useEffect, useState } from "react"
import { api } from "../axios"

const OnThisDay = () => {

    const [thisDay, setThisDay] = useState(null)
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')

    const fetchData = async(day, month) => {
        try{
            const{ data: result } = await api.get(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
            setThisDay(result)
            
        }catch(err){
            console.log(err)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchData(day, month)
    }

    useEffect(() => {
        if(day && month){
            fetchData(day, month)
        }
    }, [])


    return <div className="d-flex flex-column">
        <div style={{backgroundColor: "beige"}} className="border-bottom border-black border-3">
            <h2 className="text-start p-4 m-2 text-danger-emphasis fw-bolder">Wikipedia, On This day</h2>
                <div className="d-flex flex-column align-items-center h-25 pb-3">
                    <form onSubmit={handleSubmit}>
                            <input type="number"  onChange={(e) => setDay(e.target.value)} value={day} min={1} max={31} placeholder="Day" className="me-3 rounded-3 p-2"/>
                            <input type="number" onChange={(e) => setMonth(e.target.value)} value={month} min={1} max={12}  placeholder="Month" className="me-3 rounded-3 p-2"/>
                            <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
        </div>
        <div style={{backgroundColor: "#dab49d"}}>
            { thisDay && (
                <div className="p-5">
                    <a href={thisDay.wikipedia} className="title-date" target="blank">{thisDay.date}</a>
                    <div>
                    {thisDay.events.map((event, index) => {
                            return <div key={index} className="mt-2 p-3 border-bottom border-black">
                                <h4 className="text-danger-emphasis fw-bold">Year: {event.year}</h4>
                                <div>{event.description}</div>
                                <i className="fw-bold pt-4">References:</i>
                                <ul>
                                    {
                                        event.wikipedia.map((wiki, id) => {
                                            return <div key={id}>
                                                <li><a href={wiki.wikipedia} target="blank" className="ref">{wiki.title}</a></li>
                                            </div>
                                        })
                                    }
                                </ul>
                            </div>
                        })}
                    </div>
                </div>
            )}
            
        </div>
    </div>
}

export default OnThisDay