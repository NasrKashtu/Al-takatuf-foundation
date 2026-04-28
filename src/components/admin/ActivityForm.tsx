import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Activity,
  CATEGORY_KEYS,
  CATEGORY_LABELS,
  CategoryKey,
  MediaType,
  newActivity,
} from '@/lib/activities';
import { useApp } from '@/contexts/AppContext';

export type ActivityDraft = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // When provided, the form is in "edit" mode.
  initial?: Activity | null;
  onSubmit: (draft: ActivityDraft) => void;
}

const ActivityForm = ({ open, onOpenChange, initial, onSubmit }: Props) => {
  const { language, t } = useApp();
  const [draft, setDraft] = useState<ActivityDraft>(() =>
    initial ? toDraft(initial) : newActivity(),
  );

  useEffect(() => {
    if (open) setDraft(initial ? toDraft(initial) : newActivity());
  }, [open, initial]);

  const set = <K extends keyof ActivityDraft>(key: K, value: ActivityDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.titleEn.trim() || !draft.titleAr.trim()) {
      toast.error(t('adminToastTitleRequired'));
      return;
    }
    if (!draft.descEn.trim() || !draft.descAr.trim()) {
      toast.error(t('adminToastDescRequired'));
      return;
    }
    onSubmit(draft);
  };

  const isEdit = Boolean(initial);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? t('adminFormEditTitle') : t('adminFormNewTitle')}</DialogTitle>
          <DialogDescription>
            {t('adminFormDesc')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('adminFormTitleEn')} htmlFor="titleEn">
              <Input
                id="titleEn"
                value={draft.titleEn}
                onChange={(e) => set('titleEn', e.target.value)}
                placeholder="Voter Card Awareness Campaign"
                dir="ltr"
                required
              />
            </Field>
            <Field label={t('adminFormTitleAr')} htmlFor="titleAr">
              <Input
                id="titleAr"
                value={draft.titleAr}
                onChange={(e) => set('titleAr', e.target.value)}
                placeholder="حملة التوعية ببطاقة الناخب"
                dir="rtl"
                required
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('adminFormDescEn')} htmlFor="descEn">
              <Textarea
                id="descEn"
                value={draft.descEn}
                onChange={(e) => set('descEn', e.target.value)}
                rows={4}
                dir="ltr"
                required
              />
            </Field>
            <Field label={t('adminFormDescAr')} htmlFor="descAr">
              <Textarea
                id="descAr"
                value={draft.descAr}
                onChange={(e) => set('descAr', e.target.value)}
                rows={4}
                dir="rtl"
                required
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={t('adminFormDate')} htmlFor="date">
              <Input
                id="date"
                type="date"
                value={draft.date}
                onChange={(e) => set('date', e.target.value)}
                required
              />
            </Field>
            <Field label={t('adminFormCategory')} htmlFor="category">
              <Select
                value={draft.category}
                onValueChange={(v) => set('category', v as CategoryKey)}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {CATEGORY_LABELS[key][language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label={t('adminFormMediaType')} htmlFor="mediaType">
              <Select
                value={draft.mediaType}
                onValueChange={(v) => set('mediaType', v as MediaType)}
              >
                <SelectTrigger id="mediaType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">{t('adminFormImage')}</SelectItem>
                  <SelectItem value="video">{t('adminFormVideo')}</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field
            label={t('adminFormImageUrl')}
            htmlFor="mediaUrl"
            hint={t('adminFormImageUrlHint')}
          >
            <Input
              id="mediaUrl"
              value={draft.mediaUrl}
              onChange={(e) => set('mediaUrl', e.target.value)}
              placeholder="/images/BlogSection/example.png"
              dir="ltr"
            />
          </Field>

          <Field
            label={t('adminFormImageAlt')}
            htmlFor="mediaAlt"
            hint={t('adminFormImageAltHint')}
          >
            <Input
              id="mediaAlt"
              value={draft.mediaAlt}
              onChange={(e) => set('mediaAlt', e.target.value)}
              placeholder="Volunteers distributing food baskets"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('adminFormLocationEn')} htmlFor="locationEn">
              <Input
                id="locationEn"
                value={draft.locationEn}
                onChange={(e) => set('locationEn', e.target.value)}
                placeholder="Umm al Aranib"
                dir="ltr"
              />
            </Field>
            <Field label={t('adminFormLocationAr')} htmlFor="locationAr">
              <Input
                id="locationAr"
                value={draft.locationAr}
                onChange={(e) => set('locationAr', e.target.value)}
                placeholder="أم الأرانب"
                dir="rtl"
              />
            </Field>
          </div>

          <Field
            label={t('adminFormLink')}
            htmlFor="link"
            hint={t('adminFormLinkHint')}
          >
            <Input
              id="link"
              type="url"
              value={draft.link}
              onChange={(e) => set('link', e.target.value)}
              placeholder="https://www.facebook.com/..."
              dir="ltr"
            />
          </Field>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('adminCancel')}
            </Button>
            <Button type="submit">{isEdit ? t('adminSaveChanges') : t('adminCreateActivity')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={htmlFor} className="text-start block">
      {label}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

function toDraft(a: Activity): ActivityDraft {
  const { id, createdAt, updatedAt, ...rest } = a;
  return rest;
}

export default ActivityForm;
