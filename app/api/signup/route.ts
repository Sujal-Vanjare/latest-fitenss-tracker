import supabaseAdmin from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const data = await request.json();
  const supabase = supabaseAdmin();

  const res = await supabase.auth.admin.generateLink({
    type: "signup",
    email: data.email,
    password: data.password,
  });

  {
    return Response.json({ data: null, error: res.error });
  }
}
