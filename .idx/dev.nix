{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.pnpm  # <--- Essential: Installs pnpm permanently
  ];

  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Extensions to help you build "Nova Synthesis"
    extensions = [
      "esbenp.prettier-vscode"    # Auto-formats your code
      "bradlc.vscode-tailwindcss" # Intelligent suggestions for Tailwind
      "google.gemini-cli-vscode-ide-companion"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # This command tells IDX how to run your Next.js app with pnpm
          command = ["pnpm" "dev" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Automatically install dependencies so you don't have to type it
        npm-install = "pnpm install";
        # Open your main code file immediately
        default.openFiles = [ "src/app/page.tsx" ];
      };
      
      # Runs when the workspace is (re)started
      onStart = {
        # Ensure dependencies are always ready
        npm-install = "pnpm install";
      };
    };
  };
}