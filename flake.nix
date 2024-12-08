{
  description = "Frontend development environment with React, TypeScript, ESLint, Yarn, and Heroku CLI";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs-18_x                       # Node.js runtime
            pkgs.yarn                              # Yarn package manager
            pkgs.typescript                        # TypeScript
            pkgs.nodePackages.typescript-language-server  # TypeScript LSP
            pkgs.nodePackages.eslint              # ESLint
            pkgs.nodePackages.prettier            # Prettier
          ];

          shellHook = ''
            echo "Starting frontend development environment..."

            # Ensure Yarn and npm global directories exist
            mkdir -p $HOME/.yarn/bin $HOME/.npm-global/bin || true

            # Add Yarn/npm global directories to PATH
            export PATH="$HOME/.yarn/bin:$HOME/.npm-global/bin:$PATH"

            # Prevent errors from killing the shell
            trap 'pkill -P $$ || true' EXIT

            echo "Environment ready. Run 'node --version' to verify."
          '';
        };
      }
    );
}
