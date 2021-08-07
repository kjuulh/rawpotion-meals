FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Rawpotion.Meals.Api/Rawpotion.Meals.Api.csproj", "Rawpotion.Meals.Api/"]
RUN dotnet restore "Rawpotion.Meals.Api/Rawpotion.Meals.Api.csproj"
COPY . .
WORKDIR "/src/Rawpotion.Meals.Api"
RUN dotnet build "Rawpotion.Meals.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Rawpotion.Meals.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Rawpotion.Meals.Api.dll"]
