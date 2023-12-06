import FeaturedTable from "@/Components/FeaturedTable";
import { usePage } from "@inertiajs/react";

export default function FacilitiesTable() {
    const businesses = usePage().props.auth.businesses;
    console.log(businesses);
    
    return (
        <div>
        <FeaturedTable>
        </FeaturedTable>
        </div>
    )
}