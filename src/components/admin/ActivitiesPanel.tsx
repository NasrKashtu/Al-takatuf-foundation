import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarDays,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ActivityForm, { ActivityDraft } from './ActivityForm';
import {
  Activity,
  CATEGORY_KEYS,
  CATEGORY_LABELS,
  CategoryKey,
} from '@/lib/activities';
import { useActivities } from '@/hooks/useActivities';

type SortKey = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

const ActivitiesPanel = () => {
  const { activities, add, update, remove, resetToSeed } = useActivities();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryKey | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('date-desc');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Activity | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<Activity | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = activities.filter((a) => {
      const catOk = categoryFilter === 'all' || a.category === categoryFilter;
      if (!catOk) return false;
      if (!q) return true;
      return (
        a.titleEn.toLowerCase().includes(q) ||
        a.titleAr.toLowerCase().includes(q) ||
        a.descEn.toLowerCase().includes(q) ||
        a.descAr.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'date-asc':
          return a.date.localeCompare(b.date);
        case 'date-desc':
          return b.date.localeCompare(a.date);
        case 'title-asc':
          return a.titleEn.localeCompare(b.titleEn);
        case 'title-desc':
          return b.titleEn.localeCompare(a.titleEn);
      }
    });
    return list;
  }, [activities, search, categoryFilter, sort]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (activity: Activity) => {
    setEditing(activity);
    setFormOpen(true);
  };

  const handleSubmit = (draft: ActivityDraft) => {
    if (editing) {
      update(editing.id, draft);
      toast.success('Activity updated.');
    } else {
      add(draft);
      toast.success('Activity created.');
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    remove(confirmDelete.id);
    toast.success('Activity deleted.');
    setConfirmDelete(null);
  };

  const handleReset = () => {
    resetToSeed();
    toast.success('Activities reset to seed data.');
    setConfirmReset(false);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search
            size={16}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title or description…"
            className="ps-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={categoryFilter}
            onValueChange={(v) => setCategoryFilter(v as CategoryKey | 'all')}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORY_KEYS.map((key) => (
                <SelectItem key={key} value={key}>
                  {CATEGORY_LABELS[key].en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} /> Newest first
                </span>
              </SelectItem>
              <SelectItem value="date-asc">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} /> Oldest first
                </span>
              </SelectItem>
              <SelectItem value="title-asc">
                <span className="inline-flex items-center gap-2">
                  <ArrowDownAZ size={14} /> Title A–Z
                </span>
              </SelectItem>
              <SelectItem value="title-desc">
                <span className="inline-flex items-center gap-2">
                  <ArrowUpAZ size={14} /> Title Z–A
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmReset(true)}
            title="Restore the original six seed activities"
          >
            <RotateCcw size={14} />
            Reset
          </Button>
          <Button onClick={openCreate}>
            <Plus size={16} />
            New activity
          </Button>
        </div>
      </div>

      {/* Result meta */}
      <div className="text-sm text-muted-foreground">
        {filtered.length === activities.length
          ? `${activities.length} activit${activities.length === 1 ? 'y' : 'ies'}`
          : `${filtered.length} of ${activities.length} shown`}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState onCreate={openCreate} />
      ) : (
        <ul className="grid gap-3">
          {filtered.map((activity) => (
            <li key={activity.id}>
              <ActivityRow
                activity={activity}
                onEdit={() => openEdit(activity)}
                onDelete={() => setConfirmDelete(activity)}
              />
            </li>
          ))}
        </ul>
      )}

      <ActivityForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(confirmDelete)}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete activity?</AlertDialogTitle>
            <AlertDialogDescription>
              "{confirmDelete?.titleEn}" will be removed from the site. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to seed data?</AlertDialogTitle>
            <AlertDialogDescription>
              Every activity will be replaced with the original six. Any
              additions or edits you've made will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ActivityRow = ({
  activity,
  onEdit,
  onDelete,
}: {
  activity: Activity;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <article className="group bg-card border border-border rounded-lg p-3 flex items-center gap-4 hover:border-primary/40 transition-colors">
    <div className="w-20 h-20 sm:w-24 sm:h-16 rounded-md bg-muted overflow-hidden shrink-0 relative">
      {activity.mediaUrl ? (
        <img
          src={activity.mediaUrl}
          alt={activity.mediaAlt || ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <ImageIcon size={18} />
        </div>
      )}
      <div className="absolute bottom-0.5 end-0.5 bg-black/60 text-white rounded-full p-0.5">
        {activity.mediaType === 'video' ? (
          <Video size={10} />
        ) : (
          <ImageIcon size={10} />
        )}
      </div>
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full border"
          style={{
            backgroundColor: `hsl(var(--cat-${activity.category}) / 0.12)`,
            color: `hsl(var(--cat-${activity.category}))`,
            borderColor: `hsl(var(--cat-${activity.category}) / 0.28)`,
          }}
        >
          {CATEGORY_LABELS[activity.category].en}
        </span>
        <span className="text-xs text-muted-foreground">{activity.date}</span>
      </div>
      <h3 className="font-semibold text-foreground text-start line-clamp-1">
        {activity.titleEn}
      </h3>
      <p className="text-sm text-muted-foreground text-start line-clamp-1" dir="rtl">
        {activity.titleAr}
      </p>
    </div>

    <div className="flex items-center gap-1 shrink-0">
      <Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit activity">
        <Pencil size={15} />
        <span className="hidden sm:inline">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        aria-label="Delete activity"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={15} />
        <span className="hidden sm:inline">Delete</span>
      </Button>
    </div>
  </article>
);

const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="bg-card border border-dashed border-border rounded-lg py-14 text-center">
    <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
      <ImageIcon size={20} />
    </div>
    <h3 className="font-semibold text-foreground">No activities match</h3>
    <p className="text-sm text-muted-foreground mt-1">
      Try clearing filters, or add a new activity.
    </p>
    <Button className="mt-4" onClick={onCreate}>
      <Plus size={16} />
      New activity
    </Button>
  </div>
);

export default ActivitiesPanel;
