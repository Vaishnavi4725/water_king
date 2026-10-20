import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Save, RotateCcw, MapPin, Activity, Smartphone, Image as ImageIcon, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import { generateStarterText, generateContextualEntry } from '@/lib/aiGenerator';
import { analyzeMood, type Mood } from '@/lib/moodAnalyzer';
import { MoodIndicator } from './MoodIndicator';
import type { ContextualDataSimulated } from '@/lib/contextualData';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ContextEditor } from './ContextEditor';

export function DiaryEditor() {
  const [content, setContent] = useState('');
  const [detectedMood, setDetectedMood] = useState<Mood>('neutral');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contextualData, setContextualData] = useState<ContextualDataSimulated | null>(null);
  const [isContextManuallyEdited, setIsContextManuallyEdited] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [showContextEditor, setShowContextEditor] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (content.trim().length > 10) {
      const mood = analyzeMood(content);
      setDetectedMood(mood);
    } else {
      setDetectedMood('neutral');
    }
  }, [content]);

  const handleGenerateStarter = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const starter = generateStarterText();
      setContent(starter);
      setContextualData(null);
      setIsContextManuallyEdited(false);
      setIsGenerating(false);
      toast.success('Starter text generated!');
    }, 500);
  };

  const handleGenerateContextual = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const { text, contextualData: ctx } = generateContextualEntry();
      setContent(text);
      setContextualData(ctx);
      setIsContextManuallyEdited(false);
      setIsGenerating(false);
      toast.success('Contextual entry generated!');
    }, 800);
  };

  const handleContextUpdate = (updatedContext: ContextualDataSimulated) => {
    setContextualData(updatedContext);
    setIsContextManuallyEdited(true);
    setShowContextEditor(false);
    toast.success('Context updated! Regenerating entry...');
    
    // Regenerate entry with updated context
    setIsGenerating(true);
    setTimeout(() => {
      const { text } = generateContextualEntry(updatedContext);
      setContent(text);
      setIsGenerating(false);
      toast.success('Entry regenerated with new context!');
    }, 800);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedPhotos(prev => [...prev, ...files].slice(0, 5)); // Max 5 photos
      toast.success(`${files.length} photo${files.length > 1 ? 's' : ''} selected`);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Please write something before saving');
      return;
    }

    // Offline mode - just clear the form
    toast.info('Entry created (offline mode - not persisted)');
    setContent('');
    setDetectedMood('neutral');
    setContextualData(null);
    setIsContextManuallyEdited(false);
    setSelectedPhotos([]);
  };

  const handleClear = () => {
    setContent('');
    setDetectedMood('neutral');
    setContextualData(null);
    setIsContextManuallyEdited(false);
    setSelectedPhotos([]);
    toast.info('Editor cleared');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div
        className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1200x600.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            What's on your mind today?
          </h2>
          <p className="text-muted-foreground max-w-md">
            Let AI help you start with contextual insights
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle>Today's Entry</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </CardDescription>
              </div>
              <MoodIndicator mood={detectedMood} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your thoughts here..."
              className="min-h-[400px] text-base leading-relaxed resize-none focus-visible:ring-2"
            />

            {content.length > 0 && (
              <div className="text-xs text-muted-foreground text-right">
                {content.length} characters
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base">AI Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={handleGenerateStarter}
                disabled={isGenerating || content.length > 0}
                variant="outline"
                className="w-full gap-2 justify-start"
                size="sm"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Simple Starter'}
              </Button>

              <Button
                onClick={handleGenerateContextual}
                disabled={isGenerating || content.length > 0}
                variant="outline"
                className="w-full gap-2 justify-start"
                size="sm"
              >
                <Activity className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Contextual Entry'}
              </Button>
            </CardContent>
          </Card>

          {contextualData && (
            <Card className="border-2 bg-muted/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Context</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContextEditor(true)}
                    className="gap-1 h-7 text-xs"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{contextualData.location}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Activity className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground capitalize">{contextualData.activity.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Smartphone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{contextualData.screenUsage}</span>
                </div>
                {isContextManuallyEdited && (
                  <Badge variant="secondary" className="text-xs mt-2">
                    Manually Edited
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base">Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={selectedPhotos.length >= 5}
                variant="outline"
                className="w-full gap-2 justify-start"
                size="sm"
              >
                <ImageIcon className="w-4 h-4" />
                Add Photos ({selectedPhotos.length}/5)
              </Button>

              {selectedPhotos.length > 0 && (
                <div className="space-y-2">
                  <Separator />
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          onClick={handleClear}
          variant="outline"
          disabled={!content && selectedPhotos.length === 0}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button
          onClick={handleSave}
          disabled={!content.trim()}
          size="lg"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Entry
        </Button>
      </div>

      {showContextEditor && (
        <ContextEditor
          open={showContextEditor}
          onOpenChange={setShowContextEditor}
          contextualData={contextualData}
          onSave={handleContextUpdate}
        />
      )}
    </div>
  );
}
