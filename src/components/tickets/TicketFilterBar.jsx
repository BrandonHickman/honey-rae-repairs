export const TicketFilterBar = ({ setSearchTerm, setShowEmergencyOnly}) => {
    return (
    <div className="filter-bar">
    
        <button
            className="filter-btn btn-primary"
            onClick={() => {
                setShowEmergencyOnly(true) // Set filter to only show emergency tickets
            }}
        >
            Emergency
        </button>

        <button
            className="filter-btn btn-info"
            onClick={() => {
                setShowEmergencyOnly(false) // Set filter to show all tickets
            }}
        >
            Show All
        </button>
        <input
        onChange={(event) => (setSearchTerm(event.target.value))}
        type="text"
        placeholder="Search Tickets"
        className="ticket-search"
        />
        </div>
    )
}