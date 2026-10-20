import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import type { ExternalBlob, JournalEntry } from '../backend';

interface RecapGeneratorDialogProps {
  photos: ExternalBlob[];
  entries: JournalEntry[];
}

export function RecapGeneratorDialog({ photos, entries }: RecapGeneratorDialogProps) {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [photoCount, setPhotoCount] = useState<string>('3');
  const [recapImageUrl, setRecapImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async () => {
    if (photos.length === 0) {
      toast.error('No photos available to create a recap');
      return;
    }

    setGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const width = 1200;
      const height = 800;
      canvas.width = width;
      canvas.height = height;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#8B5CF6');
      gradient.addColorStop(1, '#6366F1');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('My Diary Recap', width / 2, 80);

      // Subtitle with entry count
      ctx.font = '24px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(`${entries.length} entries captured`, width / 2, 120);

      // Select random photos
      const count = Math.min(parseInt(photoCount), photos.length);
      const selectedPhotos = [...photos].sort(() => Math.random() - 0.5).slice(0, count);

      // Load and draw photos
      const photoPromises = selectedPhotos.map((photo, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const photoSize = count === 1 ? 500 : count === 2 ? 350 : 250;
            const spacing = 30;
            const totalWidth = count * photoSize + (count - 1) * spacing;
            const startX = (width - totalWidth) / 2;
            const y = 180;
            const x = startX + index * (photoSize + spacing);

            // Draw photo with rounded corners
            ctx.save();
            ctx.beginPath();
            const radius = 20;
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + photoSize - radius, y);
            ctx.quadraticCurveTo(x + photoSize, y, x + photoSize, y + radius);
            ctx.lineTo(x + photoSize, y + photoSize - radius);
            ctx.quadraticCurveTo(x + photoSize, y + photoSize, x + photoSize - radius, y + photoSize);
            ctx.lineTo(x + radius, y + photoSize);
            ctx.quadraticCurveTo(x, y + photoSize, x, y + photoSize - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.clip();

            // Draw image to fit
            const aspectRatio = img.width / img.height;
            let drawWidth = photoSize;
            let drawHeight = photoSize;
            let offsetX = 0;
            let offsetY = 0;

            if (aspectRatio > 1) {
              drawHeight = photoSize / aspectRatio;
              offsetY = (photoSize - drawHeight) / 2;
            } else {
              drawWidth = photoSize * aspectRatio;
              offsetX = (photoSize - drawWidth) / 2;
            }

            ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight);
            ctx.restore();

            // Border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + photoSize - radius, y);
            ctx.quadraticCurveTo(x + photoSize, y, x + photoSize, y + radius);
            ctx.lineTo(x + photoSize, y + photoSize - radius);
            ctx.quadraticCurveTo(x + photoSize, y + photoSize, x + photoSize - radius, y + photoSize);
            ctx.lineTo(x + radius, y + photoSize);
            ctx.quadraticCurveTo(x, y + photoSize, x, y + photoSize - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.stroke();

            resolve();
          };
          img.onerror = () => resolve();
          img.src = photo.getDirectURL();
        });
      });

      await Promise.all(photoPromises);

      // Footer text
      const bottomY = count === 1 ? 720 : count === 2 ? 580 : 480;
      ctx.font = '20px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('Created with DAYRY', width / 2, bottomY);

      // Convert to blob URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setRecapImageUrl(url);
          toast.success('Recap generated!');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating recap:', error);
      toast.error('Failed to generate recap');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!recapImageUrl) return;

    const link = document.createElement('a');
    link.href = recapImageUrl;
    link.download = `dayry-recap-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Recap downloaded!');
  };

  useEffect(() => {
    return () => {
      if (recapImageUrl) {
        URL.revokeObjectURL(recapImageUrl);
      }
    };
  }, [recapImageUrl]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Generate Recap
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generate Photo Recap</DialogTitle>
            <DialogDescription>
              Create a shareable image recap from your diary photos
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-count">Number of Photos</Label>
              <Select value={photoCount} onValueChange={setPhotoCount}>
                <SelectTrigger id="photo-count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Photo</SelectItem>
                  <SelectItem value="2">2 Photos</SelectItem>
                  <SelectItem value="3">3 Photos</SelectItem>
                  <SelectItem value="4">4 Photos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!recapImageUrl ? (
              <Button
                onClick={handleGenerate}
                disabled={generating || photos.length === 0}
                className="w-full"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Recap
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden bg-muted">
                  <img src={recapImageUrl} alt="Generated recap" className="w-full" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDownload} className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setRecapImageUrl(null)}
                    className="flex-1"
                  >
                    Generate New
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}
