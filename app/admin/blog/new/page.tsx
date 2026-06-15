import { db } from "@/lib/db"
import { redirect } from "next/navigation"
async function create(fd: FormData){ "use server"; await db.blogPost.create({ data:{ title:String(fd.get("title")), slug:String(fd.get("slug")), excerpt:String(fd.get("excerpt")), content:String(fd.get("content")), published: fd.get("published")==="on", publishedAt: new Date() }}); redirect("/admin/blog")}
export default function NewPost(){ return <form action={create} className="bg-card border rounded-2xl p-6 max-w-3xl space-y-3"><h1 className="font-display text-2xl">New Post</h1>
<input name="title" placeholder="Title" className="w-full border rounded-xl px-3 py-2 bg-background"/>
<input name="slug" placeholder="slug" className="w-full border rounded-xl px-3 py-2 bg-background"/>
<input name="excerpt" placeholder="Excerpt" className="w-full border rounded-xl px-3 py-2 bg-background"/>
<textarea name="content" placeholder="Content (HTML/Markdown)" className="w-full border rounded-xl px-3 py-2 bg-background min-h-[200px]"/>
<label className="text-sm"><input type="checkbox" name="published"/> Published</label>
<button className="bg-primary text-primary-foreground rounded-full px-5 py-2.5">Save</button></form>}
