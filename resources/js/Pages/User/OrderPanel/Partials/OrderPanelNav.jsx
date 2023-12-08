import NavLink from "@/Components/NavLink";

export default function OrderPanelNav() {
    return (
        <div className="bg-white dark:bg-slate-700 w-full text-gray-800 dark:text-gray-200">
            <div className="flex justify-center items-center h-16 gap-2">
                <NavLink
                    href={route("order.waitlist")}
                    active={route().current("order.waitlist")}
                    className="h-3/4 px-3 rounded border-4"
                >
                    <span>Wait List</span>
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
