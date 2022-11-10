#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN dotnet dev-certs https
WORKDIR /src
COPY ["GeoLink.Identity/GeoLink.Identity.csproj", "GeoLink.Identity/"]
RUN dotnet restore "GeoLink.Identity/GeoLink.Identity.csproj"
COPY . .
WORKDIR "/src/GeoLink.Identity"
RUN dotnet build "GeoLink.Identity.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GeoLink.Identity.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GeoLink.Identity.dll"]
