FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY ["RawPotion.Meals.Api/RawPotion.Meals.Api.csproj", "RawPotion.Meals.Api/"]
COPY ["RawPotion.Meals.Application/RawPotion.Meals.Application.csproj", "RawPotion.Meals.Application/"]
COPY ["RawPotion.Meals.Domain/RawPotion.Meals.Domain.csproj", "RawPotion.Meals.Domain/"]
COPY ["RawPotion.Meals.Persistence/RawPotion.Meals.Persistence.csproj", "RawPotion.Meals.Persistence/"]
COPY ["RawPotion.Meals.Common/RawPotion.Meals.Common.csproj", "RawPotion.Meals.Common/"]

RUN dotnet restore "RawPotion.Meals.Api/RawPotion.Meals.Api.csproj"
COPY . .
WORKDIR "/src/RawPotion.Meals.Api"
RUN dotnet build "RawPotion.Meals.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RawPotion.Meals.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RawPotion.Meals.Api.dll"]
