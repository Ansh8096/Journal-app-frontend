import type { AuthBrandingContent } from "@/constants/auth-branding";

interface AuthBrandingProps{
    content: AuthBrandingContent;
};

const AuthBranding = ({
    content
} : AuthBrandingProps) =>{
    return (

        <div className="max-w-lg space-y-10">

            {/* Logo */}
            <div className="space-y-2">

                <h1 className="text-4xl font-bold tracking-tight">
                    Journal App
                </h1>

            </div>

            {/* Heading - Title and Subtitle */}
            <div className="space-y-4">

                <h2 className="text-3xl font-bold">
                    {content.title}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    {content.subtitle}
                </p>

            </div>

            {/* Features */}

            <div className="space-y-4">

                {content.features.map((feature) => {

                    const Icon = feature.icon; // this is a standard react pattern for rendering a component stored in the local variable...

                    return (

                        <div 
                            key={feature.text}
                            className="flex items-center gap-3"
                        >
                        
                            <Icon className="h-5 w-5 text-primary" />

                            <span className="text-muted-foreground">
                                {feature.text}
                            </span>

                        </div>
                    );
                })}

            </div>

        </div>

    );
};

export default AuthBranding