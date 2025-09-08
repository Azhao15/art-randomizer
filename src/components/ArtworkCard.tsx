import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArtworkData {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display: string;
  place_of_origin: string;
  department_title: string;
  image_id: string;
  dimensions: string;
  credit_line: string;
}

interface ArtworkCardProps {
  artwork: ArtworkData;
}

export const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const imageUrl = artwork.image_id 
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : '/placeholder.svg';

  return (
    <Card className="artwork-frame bg-gallery-white border-0 overflow-hidden max-w-4xl mx-auto">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Artwork Image */}
          <div className="relative bg-gallery-off-white">
            <img
              src={imageUrl}
              alt={artwork.title}
              className="w-full h-[500px] lg:h-[600px] object-contain"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          
          {/* Artwork Details */}
          <div className="p-8 lg:p-12 space-y-6">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl lg:text-4xl text-gallery-charcoal leading-tight">
                {artwork.title}
              </h1>
              
              {artwork.artist_display && (
                <p className="text-xl text-gallery-warm-gray font-medium">
                  {artwork.artist_display}
                </p>
              )}
              
              {artwork.date_display && (
                <p className="text-lg text-gallery-warm-gray">
                  {artwork.date_display}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {artwork.medium_display && (
                <div>
                  <h3 className="font-semibold text-gallery-charcoal mb-2">Medium</h3>
                  <p className="text-gallery-warm-gray">{artwork.medium_display}</p>
                </div>
              )}
              
              {artwork.dimensions && (
                <div>
                  <h3 className="font-semibold text-gallery-charcoal mb-2">Dimensions</h3>
                  <p className="text-gallery-warm-gray">{artwork.dimensions}</p>
                </div>
              )}
              
              {artwork.place_of_origin && (
                <div>
                  <h3 className="font-semibold text-gallery-charcoal mb-2">Place of Origin</h3>
                  <p className="text-gallery-warm-gray">{artwork.place_of_origin}</p>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3">
              {artwork.department_title && (
                <Badge variant="secondary" className="bg-gallery-sage text-gallery-white">
                  {artwork.department_title}
                </Badge>
              )}
              
              {artwork.credit_line && (
                <div>
                  <h3 className="font-semibold text-gallery-charcoal mb-2">Credit</h3>
                  <p className="text-sm text-gallery-warm-gray leading-relaxed">
                    {artwork.credit_line}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};