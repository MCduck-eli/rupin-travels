import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function EditBlogs() {
    return (
        <div>
            <Link
                href="/admin/blog"
                className="flex items-center gap-2 px-4 py-3 border border-[#004D3C] rounded-xl text-[#004D3C] hover:bg-gray-50 transition-all font-medium text-sm"
            >
                <BookOpen size={20} /> Manage Blogs
            </Link>
        </div>
    );
}
