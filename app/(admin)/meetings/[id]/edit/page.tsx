export default async function EditMeetingPage({ params }: PageProps<'/meetings/[id]/edit'>) {
  const { id } = await params;

  return (
    <div className="max-w-content px-page mx-auto pt-8">
      <h1 className="text-3xl">Edit Meeting {id} — Coming Soon</h1>
    </div>
  );
}
