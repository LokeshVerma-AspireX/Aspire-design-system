import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AVATAR_URL = "https://github.com/shadcn.png";

const users = [
  { name: "Sarah Johnson", role: "Designer", initials: "SJ", src: AVATAR_URL },
  { name: "Mike Chen", role: "Engineer", initials: "MC", src: null },
  { name: "Alex Rivera", role: "Product", initials: "AR", src: AVATAR_URL },
  { name: "Emma Wilson", role: "Marketing", initials: "EW", src: null },
];

export default {
  title: "Core/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "User avatar with automatic fallback to initials when no image is provided.",
      },
    },
  },
};

export const WithImage = {
  render: () => (
    <Avatar>
      <AvatarImage src={AVATAR_URL} alt="User avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback = {
  name: "Initials Fallback",
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="User" />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={AVATAR_URL} alt="sm" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarImage src={AVATAR_URL} alt="md" />
        <AvatarFallback className="text-sm">MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarImage src={AVATAR_URL} alt="lg" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarImage src={AVATAR_URL} alt="xl" />
        <AvatarFallback className="text-xl">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AvatarGroup = {
  name: "Avatar Group (Stacked)",
  render: () => (
    <div className="flex -space-x-3">
      {users.slice(0, 4).map((u) => (
        <Avatar key={u.name} className="h-9 w-9 border-2 border-background">
          <AvatarImage src={u.src ?? undefined} alt={u.name} />
          <AvatarFallback className="text-xs">{u.initials}</AvatarFallback>
        </Avatar>
      ))}
      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
        +5
      </div>
    </div>
  ),
};

export const UserProfileHeader = {
  name: "Real World — Profile Header",
  render: () => (
    <div className="flex w-80 items-center gap-4 rounded-lg border bg-card p-4">
      <div className="relative">
        <Avatar className="h-16 w-16">
          <AvatarImage src={AVATAR_URL} alt="Sarah Johnson" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">Sarah Johnson</p>
          <Badge variant="secondary" className="shrink-0 text-xs">Pro</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Lead Product Designer</p>
        <p className="text-xs text-muted-foreground">sarah@example.com</p>
      </div>
    </div>
  ),
};

export const CommentList = {
  name: "Real World — Comment Thread",
  render: () => {
    const comments = [
      {
        user: users[0],
        text: "Great progress on the design system! The component library looks clean.",
        time: "2m ago",
      },
      {
        user: users[1],
        text: "Agreed. Should we add dark mode tokens in the next sprint?",
        time: "5m ago",
      },
      {
        user: users[2],
        text: "Already on the roadmap. ETA next week.",
        time: "8m ago",
      },
    ];
    return (
      <div className="w-96 space-y-4">
        {comments.map(({ user, text, time }) => (
          <div key={user.name} className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={user.src ?? undefined} alt={user.name} />
              <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
