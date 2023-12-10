import NavLink from "@/Components/NavLink";

export default function OrderPanelNav() {
    return (
        <div className="bg-white dark:bg-slate-700 w-full text-gray-800 dark:text-gray-200">
            <div className="flex justify-center items-center text-center h-20 gap-2">
                <NavLink
                    href={route("order.waitlist")}
                    active={route().current("order.waitlist")}
                    className="h-3/4 px-3 rounded border-4"
                >
                    <span>Wait List</span>
                </NavLink>
                <NavLink
                    href={route("order.otwlist")}
                    active={route().current("order.otwlist")}
                    className="h-3/4 px-3 rounded border-4"
                >
                    <span>On The Way</span>
                </NavLink>
                <NavLink
                    href={route("order.completedlist")}
                    active={route().current("order.completedlist")}
                    className="h-3/4 px-3 rounded border-4"
                >
                    <span>Completed</span>
                </NavLink>
                <NavLink
                    href={route("order.canceledlist")}
                    active={route().current("order.canceledlist")}
                    className="h-3/4 px-3 rounded border-4"
                >
                    <span>Canceled</span>
                </NavLink>
            </div>
        </div>
    );
}
