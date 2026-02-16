'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader, Send, ThumbsUp, Wand2 } from 'lucide-react';
import Image from 'next/image';

import { SectionTitle } from '../ui/section-title';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAiCakeSuggestion } from '@/app/actions';
import type { CakeSuggestionOutput } from '@/ai/flows/cakeSuggestionAI';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { PRODUCTS } from '@/lib/constants';

export const AiSuggester = () => {
  const [suggestion, setSuggestion] = useState<CakeSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSuggestion(null);

    const formData = new FormData(event.currentTarget);
    const input = {
      occasion: formData.get('occasion') as string,
      theme: formData.get('theme') as string,
      preferredFlavors: formData.get('preferredFlavors') as string,
    };

    try {
      const result = await getAiCakeSuggestion(input);
      setSuggestion(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na Sugestão',
        description: 'Não foi possível gerar uma sugestão. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const referencedProducts = suggestion?.referencedProductIds.map(id => 
    PRODUCTS.find(p => p.id === id)
  ).filter(Boolean);

  return (
    <section id="ai-suggester" className="py-24 bg-background">
      <SectionTitle title="Inspiração Mágica" subtitle="Deixe nossa IA criar o bolo dos seus sonhos" />
      <div className="container max-w-4xl">
        <Card className="bg-white/60 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-3">
                <BrainCircuit className="text-accent" />
                Conte-nos sua ideia
              </CardTitle>
              <CardDescription>
                Dê algumas pistas para nossa confeiteira virtual e veja a mágica acontecer.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input name="occasion" placeholder="Ocasião (ex: Aniversário de 15 anos)" required />
                <Input name="theme" placeholder="Tema (ex: Galáxia, Sereia)" />
              </div>
              <Textarea name="preferredFlavors" placeholder="Sabores preferidos, o que não pode faltar ou o que evitar..." rows={3} />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto ml-auto bg-primary text-white hover:bg-primary/90">
                {isLoading ? <Loader className="animate-spin" /> : <Send />}
                Gerar Sugestão
              </Button>
            </CardFooter>
          </form>
        </Card>

        <AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-8 space-y-4">
              <Loader className="h-8 w-8 mx-auto animate-spin text-accent" />
              <p className="font-sans text-sm text-muted-foreground">Nossa IA está misturando os ingredientes...</p>
            </motion.div>
          )}
          {suggestion && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <Card className="border-accent shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Wand2 size={24}/> Sugestão da Chef AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-bold font-sans tracking-wide text-primary">Design Sugerido</h4>
                        <p className="text-sm font-body text-primary/80 mt-1">{suggestion.suggestedDesign}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-sans tracking-wide text-primary">Combinação de Sabores</h4>
                        <p className="text-sm font-body text-primary/80 mt-1">{suggestion.suggestedFlavors}</p>
                    </div>
                     <div>
                        <h4 className="font-bold font-sans tracking-wide text-primary flex items-center gap-2"><ThumbsUp size={16}/> Por que essa combinação?</h4>
                        <p className="text-sm font-body text-primary/80 mt-1">{suggestion.reasoning}</p>
                    </div>
                    {referencedProducts && referencedProducts.length > 0 && (
                        <div>
                            <h4 className="font-bold font-sans tracking-wide text-primary">Inspirado em:</h4>
                            <div className="flex gap-4 mt-2 overflow-x-auto pb-2">
                                {referencedProducts.map(product => product && (
                                    <div key={product.id} className="flex-shrink-0">
                                        <Image src={product.image} alt={product.name} width={100} height={100} className="rounded-lg object-cover" />
                                        <p className="text-xs text-center mt-1 font-sans text-primary/70">{product.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
