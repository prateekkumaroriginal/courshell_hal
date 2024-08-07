import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export const columns = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Role
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center font-medium">
                {row.getValue('role')}
            </div>
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Member Since
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const time = new Date(row.getValue("createdAt"));
            const formattedTime = time.toLocaleTimeString();
            const formattedDate = time.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            return (
                <div className="text-center font-medium">
                    <div>
                        {formattedTime}
                    </div>
                    <div className="border-b border-slate-600/60 max-w-20 mx-auto"></div>
                    <div>
                        {formattedDate}
                    </div>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link to={id} className="cursor-pointer">
                            <DropdownMenuItem className="cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" /> Manage
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
