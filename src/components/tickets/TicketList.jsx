import { useEffect, useState } from "react" // useEffect lets you run side-effects (like data fetching), useState is for local state
import { getAllTickets } from "../../services/ticketService" // Importing a function that fetches ticket data
import "./Tickets.css" // Importing CSS styles for this component
import { Ticket } from "./Ticket.jsx" // Importing the Ticket component to render individual ticket items
import { TicketFilterBar } from "./TicketFilterBar"
// Define and export a component called TicketList
export const TicketList = () => {
    // State to store all tickets fetched from the server
    const [allTickets, setAllTickets] = useState([])

    // State to control whether we only show emergency tickets
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)

    // State to hold the list of tickets we're currently displaying (filtered or all)
    const [filteredTickets, setFilteredTickets] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    // useEffect runs when the component first loads (empty dependency array [])
    useEffect(() => {
        // Call the getAllTickets function to fetch data
        getAllTickets().then((ticketsArray) => {
            setAllTickets(ticketsArray) // Store all tickets in state
            console.log("tickets set!") // Debug message to show it's working
        })
    }, []) // Runs only once when the component mounts

    // useEffect runs every time `showEmergencyOnly` or `allTickets` changes
    useEffect(() => { 
        // If emergency filter is active, filter tickets to show only those with emergency === true
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(
                (ticket) => ticket.emergency === true
            )
            setFilteredTickets(emergencyTickets) // Update the filtered list
        } else {
            setFilteredTickets(allTickets) // Otherwise, show all tickets
        }
    }, [showEmergencyOnly, allTickets]) // Runs when either of these values changes

    useEffect(() => {
        const foundTickets = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTickets(foundTickets)
    }, [searchTerm, allTickets])

    // JSX return — this is the UI of the component
    return (
        <div className="tickets-container">
            <h2>Tickets</h2>
            <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm}/>
            {/* Loop over the filtered tickets and render each using the Ticket component */}
            <article className="tickets">
                {filteredTickets.map((ticketObj) => {
                    // Pass ticket object and name as props to the Ticket component
                    return <Ticket ticket={ticketObj} key={ticketObj.id} />
                })}
            </article>
        </div>
    )
}



    