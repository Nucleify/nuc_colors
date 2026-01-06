<?php

namespace App\Services;

use App\Models\UserColor;
use App\Resources\UserColorResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserColorService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly UserColor $model,
        protected string $entity = 'user color',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->where('user_id', $this->causer->id)->get();

        $this->logger->logIndex($this->causer->name, $this->entity, true);

        return UserColorResource::collection($result);
    }

    /**
     * @param Request $request
     *
     * @return int
     *
     * @throws Exception
     */
    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return $result;
    }

    /**
     * @param string $name
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getByName(string $name): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByName($name)
            ->where('user_id', $this->causer->id)->get();

        $this->logger->logMessage($this->causer->name . ' fetched user colors by name: ' . $name . '.');

        return UserColorResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return UserColorResource
     *
     * @throws Exception
     */
    public function show($id): UserColorResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'showed');

        return new UserColorResource($result);
    }

    /**
     * @param array $data
     *
     * @return UserColorResource
     *
     * @throws Exception
     */
    public function create(array $data): UserColorResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'created');

        return new UserColorResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return UserColorResource
     *
     * @throws Exception
     */
    public function update($id, array $data): UserColorResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'updated');

        return new UserColorResource($result->fresh());

    }

    /**
     * @param int $id
     *
     * @return void
     *
     * @throws Exception
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getName(), $this->entity, 'deleted');
    }

    /**
     * Bulk update user colors
     *
     * @param Request $request
     * @param array $colors Array of ['name' => string, 'value' => string]
     *
     * @return array
     *
     * @throws Exception
     */
    public function updateAll(Request $request, array $colors): array
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $updatedCount = 0;
        $createdCount = 0;
        $userId = $this->causer->id;

        foreach ($colors as $colorData) {
            if (!isset($colorData['name']) || !isset($colorData['value'])) {
                continue;
            }

            $colorRecord = UserColor::where('user_id', $userId)
                ->where('name', $colorData['name'])
                ->first();

            $isNew = $colorData['new'] ?? true;

            if ($colorRecord) {
                if ($colorRecord->getValue() !== $colorData['value']) {
                    $colorRecord->update([
                        'value' => $colorData['value'],
                        'new' => $isNew,
                    ]);
                    $updatedCount++;
                }
            } else {
                UserColor::create([
                    'user_id' => $userId,
                    'name' => $colorData['name'],
                    'value' => $colorData['value'],
                    'new' => $isNew,
                ]);
                $createdCount++;
            }
        }

        $this->logger->logMessage($this->causer->name . ' bulk updated ' . $updatedCount . ', created ' . $createdCount . ' user colors.');

        return [
            'updated_count' => $updatedCount,
            'created_count' => $createdCount,
        ];
    }
}
