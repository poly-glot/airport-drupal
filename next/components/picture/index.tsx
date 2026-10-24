interface PictureProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    sizes?: string;
    widths?: string;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
    cssClass?: string;
    pictureClass?: string;
}

function buildSrcset(prefix: string, widthList: string[], extension: string) {
    return widthList.map((width) => `${prefix}${width}.${extension} ${width}w`).join(', ');
}

export default function Picture({
    src,
    alt = '',
    width,
    height,
    sizes = '100vw',
    widths,
    loading = 'lazy',
    priority = false,
    cssClass,
    pictureClass,
}: PictureProps) {
    const widthInStem = src.split('-').pop() ?? '';
    const prefix = src.slice(0, src.length - widthInStem.length);
    const widthList = (widths ? widths.split(',') : [widthInStem]).map((entry) => entry.trim());

    return (
        <picture className={pictureClass || undefined}>
            <source type="image/avif" srcSet={buildSrcset(prefix, widthList, 'avif')} sizes={sizes} />
            <source type="image/webp" srcSet={buildSrcset(prefix, widthList, 'webp')} sizes={sizes} />
            <img
                className={cssClass || undefined}
                src={`${src}.jpg`}
                srcSet={buildSrcset(prefix, widthList, 'jpg')}
                sizes={sizes}
                width={width || undefined}
                height={height || undefined}
                alt={alt}
                loading={loading}
                fetchPriority={priority ? 'high' : undefined}
                decoding="async"
            />
        </picture>
    );
}
